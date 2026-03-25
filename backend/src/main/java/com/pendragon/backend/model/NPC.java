package com.pendragon.backend.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "npcs")
public class NPC {
    @Id
    private String id;
    private String name;
    private String role;
    private String location;
    private String relationship;
    private String description;
    private String status;
    private String imageUrl;
}
