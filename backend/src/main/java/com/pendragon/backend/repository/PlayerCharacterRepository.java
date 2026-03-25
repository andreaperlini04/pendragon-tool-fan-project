package com.pendragon.backend.repository;

import com.pendragon.backend.model.PlayerCharacter;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlayerCharacterRepository extends MongoRepository<PlayerCharacter, String> {
}
