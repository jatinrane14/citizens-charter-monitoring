package com.minor.charter.monitoring.services;

import com.minor.charter.monitoring.dto.AuthResponse;
import com.minor.charter.monitoring.models.CitizenModel;
import com.minor.charter.monitoring.models.PostalStaffModel;
import com.minor.charter.monitoring.models.UserBaseModel;
import com.minor.charter.monitoring.repository.PostalStaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class PostalStaffServices extends UserServicesImplementation{
    @Autowired
    AuthenticationManager authManager;

    @Autowired
    PostalStaffRepository postalStaffRepo;

    @Autowired
    JWTService jwtService;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(11);

    public PostalStaffModel createPostalStaff(PostalStaffModel staff) {
        try{
            Long count = postalStaffRepo.count();
            String customId = "USI" + count;
            staff.setEmployeeId(customId);
            staff.setPassword(encoder.encode(staff.getPassword()));
            return postalStaffRepo.save(staff);
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    public ResponseEntity<AuthResponse> verify(PostalStaffModel user) {
        String token=null;
        PostalStaffModel dbUser = null;
        try{
            Authentication authentication =
                    authManager
                            .authenticate(new UsernamePasswordAuthenticationToken(user.getUserEmail(),user.getPassword()));
            if(authentication.isAuthenticated()) {
                dbUser = (PostalStaffModel) postalStaffRepo.findByUserEmail(user.getUserEmail());
                System.out.println(dbUser);
                token = jwtService.generateToken(user.getUserEmail(), dbUser.getRole(),dbUser);
            }else{
                System.out.println("Not authenticate");
            }
            return ResponseEntity.ok(new AuthResponse(true,"Login Successfull",token,"POSTAL_STAFF",dbUser.getDesignation()));
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
}
