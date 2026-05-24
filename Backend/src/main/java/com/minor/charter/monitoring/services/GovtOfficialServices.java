package com.minor.charter.monitoring.services;

import com.minor.charter.monitoring.dto.AuthResponse;
import com.minor.charter.monitoring.models.GovtOfficialModel;
import com.minor.charter.monitoring.models.PostalStaffModel;
import com.minor.charter.monitoring.models.UserBaseModel;
import com.minor.charter.monitoring.repository.GovtOfficialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class GovtOfficialServices extends UserServicesImplementation{
    @Autowired
    AuthenticationManager authManager;

    @Autowired
    GovtOfficialRepository govtOfficialRepository;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(11);

    @Autowired
    JWTService jwtService;

    public ResponseEntity<AuthResponse> verify(GovtOfficialModel user) {
        String token=null;
        UserBaseModel dbUser = null;
        System.out.println("38:"+user.getUserEmail());
        try{
            Authentication authentication =
                    authManager
                            .authenticate(new UsernamePasswordAuthenticationToken(user.getUserEmail(),user.getPassword()));
            if(authentication.isAuthenticated()) {
                dbUser = govtOfficialRepository.findByUserEmail(user.getUserEmail());
                System.out.println(dbUser);
                token = jwtService.generateToken(user.getUserEmail(), dbUser.getRole(),dbUser);
            }else{
                System.out.println("Not authenticate");
            }
            return ResponseEntity.ok(new AuthResponse(true,"Login Successfull",token,"GOV_OFFICIAL",null));
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

    public ResponseEntity<GovtOfficialModel> createOfficial(GovtOfficialModel userData){
        userData.setPassword(encoder.encode(userData.getPassword()));
        return ResponseEntity.ok(govtOfficialRepository.save(userData));
    }
}
