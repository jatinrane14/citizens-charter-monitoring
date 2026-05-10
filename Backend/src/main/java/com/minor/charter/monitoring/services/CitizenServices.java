package com.minor.charter.monitoring.services;

import com.minor.charter.monitoring.dto.AuthResponse;
import com.minor.charter.monitoring.models.CitizenModel;
import com.minor.charter.monitoring.models.UserBaseModel;
import com.minor.charter.monitoring.repository.CitizenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class CitizenServices extends UserServicesImplementation{
    @Autowired
    AuthenticationManager authManager;

    @Autowired
    CitizenRepository citizenRepo;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(11);

    @Autowired
    JWTService jwtService;



    public ResponseEntity<AuthResponse> verify(CitizenModel user) {
        String token=null;
        try{
            Authentication authentication =
                    authManager
                            .authenticate(new UsernamePasswordAuthenticationToken(user.getUserName(),user.getPassword()));
            if(authentication.isAuthenticated())
                token = jwtService.generateToken(user.getUserName());
            return ResponseEntity.ok(new AuthResponse(true,"Login Successfull",token));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(
                            new AuthResponse(
                                    false,
                                    "Invalid username or password",
                                    null
                            )
                    );
        }
    }

    public CitizenModel createCitizen(CitizenModel citizen){
        citizen.setPassword(encoder.encode(citizen.getPassword()));
        return citizenRepo.save(citizen);
    }

    public ResponseEntity<CitizenModel> getUserData(String userID) {
        Optional<CitizenModel> citizen = citizenRepo.findById(userID);

        if (citizen.isPresent()) {
            return ResponseEntity.ok(citizen.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
