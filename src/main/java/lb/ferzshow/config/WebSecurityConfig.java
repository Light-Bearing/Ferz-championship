package lb.ferzshow.config;

import lb.ferzshow.model.User;
import lb.ferzshow.repository.UserRepository;
import lb.ferzshow.security.AuthUser;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;

import java.util.Optional;

@Configuration
@EnableWebSecurity
@Slf4j
@AllArgsConstructor
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    private final UserRepository userRepository;

    @Bean
    public UserDetailsService userDetailsService() {
        return email ->{
            log.debug("Authenticating '{}'", email);
            Optional<User> optionalUser = userRepository.findByEmailIgnoreCase(email);
            return new AuthUser(optionalUser.orElseThrow(
                    () -> new UsernameNotFoundException("User '" + email + "' was not found")));
        };
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
//        auth.inMemoryAuthentication()
//                .passwordEncoder(PasswordEncoderFactories.createDelegatingPasswordEncoder())
//                .withUser("user@gmail.com").password("{noop}password").roles("USER").and()
//                .withUser("admin@javaops.ru").password("{noop}admin").roles("USER", "ADMIN");
        auth.userDetailsService(userDetailsService())
                .passwordEncoder(PasswordEncoderFactories.createDelegatingPasswordEncoder());
    }

//    @Override
//    protected void configure(HttpSecurity http) throws Exception{
//        http.authorizeRequests()
//                .antMatchers("/api/account").hasRole(Role.USER.name())
//                .antMatchers("/api/**").hasRole(Role.ADMIN.name())
//                .and().formLogin();
//    }
}
