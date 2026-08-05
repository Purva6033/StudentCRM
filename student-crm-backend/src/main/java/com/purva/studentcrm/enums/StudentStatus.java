package com.purva.studentcrm.enums;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

public enum StudentStatus {
    ACTIVE,
    INACTIVE,
    SUSPENDED
} 
    @Enumerated(EnumType.STRING)
    private StudentStatus status;
    
