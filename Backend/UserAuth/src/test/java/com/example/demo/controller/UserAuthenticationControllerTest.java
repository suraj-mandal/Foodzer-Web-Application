package com.example.demo.controller;

import com.example.demo.exception.UserExistsException;
import com.example.demo.model.User;
import com.example.demo.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;


import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class UserAuthenticationControllerTest {

    @Autowired
    private MockMvc mockMvc;
    private User user;

    @MockBean
    UserService userService;

    @InjectMocks
    UserAuthenticationController authController;

    @Before
    public void setUp() throws Exception {
        MockitoAnnotations.initMocks(this);
        user = new User("Manasa@1", "manasa@gmail.com", "Manasa", "Allam", "user@123");

    }


    @Test
    public void testRegisterUserSuccess() throws Exception {
        when(userService.registerUser(Mockito.any(User.class))).thenReturn(true);
        mockMvc.perform(post("/auth/register").contentType(MediaType.APPLICATION_JSON).content(asJsonString(user)))
                .andExpect(status().isOk()).andDo(print());
    }

    @Test
    public void testRegisterUserFailure() throws UserExistsException, Exception {

        when(userService.registerUser(Mockito.any(User.class))).thenThrow(UserExistsException.class);
        mockMvc.perform(post("/auth/register").contentType(MediaType.APPLICATION_JSON).content(asJsonString(user)))
                .andExpect(status().isConflict()).andDo(print());
    }

    @Test
    public void testLoginSuccess() throws Exception {
        when(userService.login(user.getUsername(),user.getPassword())).thenReturn(user);
        mockMvc.perform(post("/auth/login").contentType(MediaType.APPLICATION_JSON).content(asJsonString(user)))
                .andExpect(status().isOk()).andDo(print());
    }

    @Test
    public void testLoginFailure() throws Exception {
        when(userService.login(user.getUsername(),user.getPassword())).thenReturn(null);
        mockMvc.perform(post("/auth/login").contentType(MediaType.APPLICATION_JSON).content(asJsonString(user)))
                .andExpect(status().isUnauthorized()).andDo(print());
    }

    public static String asJsonString(final Object obj) {
        try {

            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }



}

