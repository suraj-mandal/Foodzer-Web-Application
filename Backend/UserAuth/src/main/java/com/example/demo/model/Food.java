package com.example.demo.model;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@Entity
@Table(name = "food")
public class Food {
    @Id
    String fdcId;

    @JsonIgnore
    @ManyToMany(mappedBy = "favorites",fetch = FetchType.LAZY)
    private Set<User> users=new HashSet<>();

    public Food(String fdcId) {
        this.fdcId = fdcId;
    }


    public Food(String fdcId, List<User> users) {
        this.fdcId = fdcId;
    }

    public Food() {
    }

    public String getFdcId() {
        return fdcId;
    }

    public void setFdcId(String fdcId) {
        this.fdcId = fdcId;
    }

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

    @Override
    public String toString() {
        return "Food{" +
                "fdcId='" + fdcId + '\'' +
                '}';
    }
}
