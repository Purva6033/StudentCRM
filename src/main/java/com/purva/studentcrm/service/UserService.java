package com.purva.studentcrm.service;

import java.time.LocalDate;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import com.purva.studentcrm.entity.Student;
import com.purva.studentcrm.dto.LoginRequest;
import com.purva.studentcrm.dto.LoginResponse;
import com.purva.studentcrm.dto.RegisterRequest;
import com.purva.studentcrm.entity.User;
import com.purva.studentcrm.enums.Role;
import com.purva.studentcrm.repository.CourseRepository;
import com.purva.studentcrm.repository.StudentRepository;
import com.purva.studentcrm.repository.UserRepository;
import com.purva.studentcrm.security.JwtUtil;
import com.purva.studentcrm.dto.ChangePasswordRequest;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import com.purva.studentcrm.security.OtpData;


@Service
public class UserService {

    @Autowired
    private JwtUtil jwtUtil;


private final Map<String, OtpData> otpStorage = new HashMap<>();
    
    @Autowired
    private StudentRepository studentRepository;
    
    @Autowired
    private UserRepository repository;

    @Autowired
    private PasswordEncoder passwordEncoder;


    @Autowired
    private CourseRepository courseRepository;

    // ================= REGISTER =================

    public User register(RegisterRequest request) {

        if (repository.findByEmail(request.getEmail()).isPresent()) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Email already exists");

        }

        if (repository.existsByUsername(request.getUsername())) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Username already exists");

        }
        User user = new User();

        user.setUsername(request.getUsername());
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        // Every self-registration is a STUDENT
        user.setRole(Role.STUDENT);
        user.setIsActive(false);

        user.setApprovalStatus("PENDING");

        User savedUser = repository.save(user);

        Student student = new Student();

        student.setStudentName(request.getFullName());
        student.setEmail(request.getEmail());
        student.setPhone(request.getPhone());
        student.setDateOfBirth(request.getDateOfBirth());
        student.setGender(request.getGender());
        student.setCity(request.getCity());
        student.setState(request.getState());
        student.setPinCode(request.getPinCode());
        student.setQualification(request.getQualification());
        student.setPassingYear(request.getPassingYear());
        student.setPercentage(request.getPercentage());
        student.setPreferredCourse(request.getPreferredCourse());
        student.setMode(request.getMode());
        student.setAdmissionDate(LocalDate.now());
        student.setStudentCode("STU" + (1000 + repository.count()));
        student.setStatus("Registered");

        studentRepository.save(student);

        return savedUser;

    }

    // ================= LOGIN =================

    public LoginResponse login(LoginRequest request) {

        User user = repository.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.UNAUTHORIZED,
                                "Invalid Email or Password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {

            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Invalid Email or Password");
        }
        if (!user.getIsActive()) {

            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Your registration is waiting for Admin approval."
            );

        }

        String token = jwtUtil.generateToken(user.getEmail());

        return new LoginResponse(
                token,
                user.getEmail(),
                user.getRole().name());
    }

    // ================= RESET ADMIN PASSWORD =================

    public String resetAdminPassword() {

        User user = repository.findByEmail("admin@crm.com")
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Admin not found"));

        user.setPassword(passwordEncoder.encode("admin123"));

        repository.save(user);

        return "Password Updated Successfully";
    }

    // ================= RESET COUNSELOR PASSWORD =================

    public String resetCounselorPassword() {

        User user = repository.findByEmail("counselor@gmail.com")
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Counselor not found"));

        user.setPassword(passwordEncoder.encode("counselor123"));

        repository.save(user);

        return "Password Reset Successfully";
    }

    public String resetStudentPassword() {

        User user = repository.findByEmail("riya@gmail.com")
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Student not found"
                ));

        user.setPassword(passwordEncoder.encode("student123"));

        repository.save(user);

        return "Student Password Reset Successfully";
    }
    
 // ================= CHANGE PASSWORD =================

    public String changePassword(ChangePasswordRequest request) {

        User user = repository.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "User not found"));

        if (!passwordEncoder.matches(request.getOldPassword(), user.getPassword())) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Old password is incorrect");
        }

        if (!request.getNewPassword().equals(request.getConfirmPassword())) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "New Password and Confirm Password do not match");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));

        repository.save(user);

        return "Password Changed Successfully";
    }
    // ================= USERS =================

    public List<User> getAllUsers() {
        return repository.findAll();
    }

    public List<User> getAllCounselors() {
        return repository.findByRole(Role.COUNSELOR);
    }

    public JwtUtil getJwtUtil() {
        return jwtUtil;
    }

    public void setJwtUtil(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }
    public User getUserByEmail(String email) {

        return repository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

    }

	public CourseRepository getCourseRepository() {
		return courseRepository;
	}

	public void setCourseRepository(CourseRepository courseRepository) {
		this.courseRepository = courseRepository;
	}

	public StudentRepository getStudentRepository() {
		return studentRepository;
	}

	public void setStudentRepository(StudentRepository studentRepository) {
		this.studentRepository = studentRepository;
	}
	
	// ================= PENDING STUDENTS =================

	public List<User> getPendingStudents() {

	    return repository.findByApprovalStatus("PENDING");

	}

	// ================= APPROVE STUDENT =================

	public String approveStudent(Integer id) {

	    User user = repository.findById(id)
	            .orElseThrow(() ->
	                    new ResponseStatusException(
	                            HttpStatus.NOT_FOUND,
	                            "Student not found"));

	    user.setApprovalStatus("APPROVED");

	    user.setIsActive(true);

	    repository.save(user);

	    return "Student Approved Successfully";

	}

	// ================= REJECT STUDENT =================

	public String rejectStudent(Integer id) {

	    User user = repository.findById(id)
	            .orElseThrow(() ->
	                    new ResponseStatusException(
	                            HttpStatus.NOT_FOUND,
	                            "Student not found"));

	    user.setApprovalStatus("REJECTED");

	    user.setIsActive(false);

	    repository.save(user);

	    return "Student Rejected Successfully";

	}

	public java.util.Map<String, OtpData> getOtpStorage() {

	    return otpStorage;

	}
	
	public String generateOtp(String email) {

	    repository.findByEmail(email)
	            .orElseThrow(() ->
	                    new ResponseStatusException(
	                            HttpStatus.NOT_FOUND,
	                            "Email not found"));

	    int otp = 100000 + new java.util.Random().nextInt(900000);

	    OtpData data = new OtpData(

	            String.valueOf(otp),

	            LocalDateTime.now(),

	            LocalDateTime.now().plusMinutes(5)

	    );

	    otpStorage.put(email, data);

	    return String.valueOf(otp);

	}
	public String verifyOtp(String email,
            String otp) {

OtpData data = otpStorage.get(email);

if (data == null) {

throw new ResponseStatusException(
    HttpStatus.BAD_REQUEST,
    "Generate OTP First");

}

if (LocalDateTime.now().isAfter(data.getExpiryTime())) {

otpStorage.remove(email);

throw new ResponseStatusException(
    HttpStatus.BAD_REQUEST,
    "OTP Expired");

}

if (!data.getOtp().equals(otp)) {

throw new ResponseStatusException(
    HttpStatus.BAD_REQUEST,
    "Invalid OTP");

}

return "OTP Verified";

}

	public String resetPassword(String email,
            String newPassword) {

User user = repository.findByEmail(email)
.orElseThrow(() ->
    new ResponseStatusException(
            HttpStatus.NOT_FOUND,
            "User not found"));

user.setPassword(passwordEncoder.encode(newPassword));

repository.save(user);

otpStorage.remove(email);

return "Password Reset Successfully";

}
}