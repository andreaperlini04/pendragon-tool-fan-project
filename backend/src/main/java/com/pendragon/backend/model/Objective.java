package com.pendragon.backend.model;

import lombok.Data;

@Data
public class Objective {
    private Integer id;
    private String text;
    private Boolean completed;
}
