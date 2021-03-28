package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="Recommend")
public class Recommendation {

    @Id
    private String fdcId;

    @JsonIgnore
    @ManyToMany(fetch = FetchType.LAZY,cascade = CascadeType.PERSIST)
    @JoinTable(name = "recommended_foods",joinColumns = {@JoinColumn(name = "fdcId",referencedColumnName = "fdcId")},
            inverseJoinColumns = {@JoinColumn(name = "username",referencedColumnName = "username")})
    private List<User> users=new ArrayList<>();

    public Recommendation() {
    }

    public Recommendation(String fdcId) {
        this.fdcId = fdcId;
    }

    public String getFdcId() {
        return fdcId;
    }

    public void setFdcId(String fdcId) {
        this.fdcId = fdcId;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    public void addUsers(User user){
        this.users.add(user);
    }

    public int getLength(){
        return this.users.size();
    }

    @Override
    public String toString() {
        return "Recommendation{" +
                "fdcId='" + fdcId + '\'' +
                ", users=" + users +
                '}';
    }
}
