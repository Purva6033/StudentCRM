package com.purva.studentcrm.security;

import java.security.Key;
import java.util.Date;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

    // Secret key (minimum 32 characters)
    private static final String SECRET =
            "purvastudentcrmjwtsecretkey123456789";

    private final Key key = Keys.hmacShaKeyFor(SECRET.getBytes());

    // Token validity (24 hours)
    private final long EXPIRATION = 1000 * 60 * 60 * 24;

    public String generateToken(String email) {

        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }
}