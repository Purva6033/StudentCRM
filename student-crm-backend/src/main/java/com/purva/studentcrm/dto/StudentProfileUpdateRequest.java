package com.purva.studentcrm.dto;

import jakarta.validation.constraints.Pattern;

public class StudentProfileUpdateRequest {

    private String email;

    @Pattern(regexp = "\\d{10}", message = "Phone must contain 10 digits")
    private String phone;

    private String address;

    public StudentProfileUpdateRequest() {
    }

    public StudentProfileUpdateRequest(String email, String phone, String address) {
        this.email = email;
        this.phone = phone;
        this.address = address;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}