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
        UserBaseModel dbUser = null;
        System.out.println("38:"+user.getUserEmail());
        try{
            Authentication authentication =
                    authManager
                            .authenticate(new UsernamePasswordAuthenticationToken(user.getUserEmail(),user.getPassword()));
            if(authentication.isAuthenticated()) {
                dbUser = citizenRepo.findByUserEmail(user.getUserEmail());
                System.out.println(dbUser);
                token = jwtService.generateToken(user.getUserEmail(), dbUser.getRole(),dbUser);
            }else{
                System.out.println("Not authenticate");
            }
            return ResponseEntity.ok(new AuthResponse(true,"Login Successfull",token,"CITIZEN",null));
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(
                            new AuthResponse(
                                    false,
                                    "Invalid username or password",
                                    null,null,null
                            )
                    );
        }
    }

    public ResponseEntity<Map<String, String>> createCitizen(CitizenModel citizen){
        citizen.setPassword(encoder.encode(citizen.getPassword()));
        Map<String,String> response = new HashMap<>();
        try{
            CitizenModel res = citizenRepo.save(citizen);
            if (res!=null){
                response.put("success","true");
                response.put("result","User Regestered Successfully!");
                return ResponseEntity.ok(response);
            }
            response.put("success", "false");
            response.put("result", "Unable to Register User!");
            return ResponseEntity.badRequest().body(response);
        } catch (Exception e) {
            response.put("success","false");
            response.put("result","Internal Server Error!!");
            return ResponseEntity.internalServerError().body(response);
        }

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
