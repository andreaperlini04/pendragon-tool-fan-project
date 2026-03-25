package com.pendragon.backend.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document(collection = "quests")
public class Quest {
    @Id
    private String id;
    private String title;
    private String status;
    private String priority;
    private Integer progress;
    private String description;
    private List<Objective> objectives;
    private String reward;
}
