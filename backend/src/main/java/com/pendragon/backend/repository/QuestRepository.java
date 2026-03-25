package com.pendragon.backend.repository;

import com.pendragon.backend.model.Quest;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestRepository extends MongoRepository<Quest, String> {
}
