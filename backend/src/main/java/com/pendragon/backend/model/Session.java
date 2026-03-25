package com.pendragon.backend.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document(collection = "sessions")
public class Session {
    @Id
    private String id;
    private Integer number;
    private String title;
    private String date;
    private String duration;
    private String summary;
    private List<String> highlights;
}
