package com.ycyw.your_car_your_way_app.services;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.ycyw.your_car_your_way_app.model.User;
import com.ycyw.your_car_your_way_app.repository.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    /**
     * Load user details by email.
     *
     * @param email The email of the user to load.
     * @return UserDetails object containing user details.
     * @throws UsernameNotFoundException If the user with the given username is not
     *                                   found.
     */
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email);// .get();

        if (user == null) {
            throw new UsernameNotFoundException("User not found with email: " + email);
        }
        // Create a UserDetails object using the user's email (email), password, and
        // granted authorities
        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                new ArrayList<GrantedAuthority>());
    }
}
