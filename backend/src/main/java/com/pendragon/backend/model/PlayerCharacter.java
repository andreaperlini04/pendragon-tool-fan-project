package com.pendragon.backend.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.Map;

@Data
@Document(collection = "characters")
public class PlayerCharacter {
    @Id
    private String id;
    private String name;
    private String player;
    
    // Personal Data
    private Integer age;
    private Integer sonNumber;
    private String homeland;
    private String culture;
    private String religion;
    private String lord;
    private String currentClass;
    private String currentHome;

    // Attributes
    private Integer siz;
    private Integer dex;
    private Integer str;
    private Integer con;
    private Integer app;

    // Features
    private String features;

    // Traits (Map storing trait -> value, e.g. chaste -> 15)
    private Map<String, Integer> traits;

    // Passions
    private Map<String, Integer> passions;

    // Skills
    private Map<String, Integer> skills;

    // Combat Skills
    private Map<String, Integer> combatSkills;
    
    private String status;
    private Integer glory;
}
