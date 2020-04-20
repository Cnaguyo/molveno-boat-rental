//package com.MolvenoBoatRental;
//
//import com.MolvenoBoatRental.controllers.BoatController;
//import com.MolvenoBoatRental.model.Boat;
//import com.MolvenoBoatRental.repository.BoatRepository;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import jdk.internal.jimage.ImageLocation;
//import jdk.internal.jline.internal.TestAccessible;
//import org.junit.Before;
//import org.junit.FixMethodOrder;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.junit.runners.MethodSorters;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.Mockito;
//import org.mockito.junit.MockitoJUnitRunner;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.http.MediaType;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.setup.MockMvcBuilders;
//import org.springframework.web.bind.annotation.SessionAttributes;
//
//import java.util.ArrayList;
//import java.util.List;
//
//import static com.sun.tools.doclint.Entity.times;
//import static org.hamcrest.Matchers.hasSize;
//import static org.hamcrest.Matchers.is;
//import static org.mockito.Mockito.*;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
//import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
//@RunWith(MockitoJUnitRunner.class)
//@SpringBootTest
//@FixMethodOrder(MethodSorters.NAME_ASCENDING)
//public class HelloControllerTest {
//
//    @InjectMocks
//    private BoatController movieController;
//
//    @Mock
//    private BoatRepository boatRepository;
//
//    private MockMvc mockMvc;
//
//
//    @Before
//    public void setup() {
//        mockMvc = MockMvcBuilders.standaloneSetup(boatController).build();
//    }
//
//    @Test
//    public void testAddMovie() throws Exception {
//        Boat boat = new Boat("Rowing boat", 3, 424234L, 100,100,"True",
//        ObjectMapper  mapper = new ObjectMapper());
//        String json = mapper.writeValueAsString(boat);
//
//        when(boatRepository.save(Mockito.any(Boat.class)))
//                .thenReturn(boat);
//
//        this.mockMvc.perform(post("/api/boats")
//                .contentType(MediaType.APPLICATION_JSON)
//                .content(json))
//                .andDo(print())
////                .andExpect(jsonPath("$.id", is(boat.getId().intValue())))
////                .andExpect(jsonPath("$.title", is(boat.getTitle())))
//                .andExpect(status().isOk());
//
//        verify(boatRepository, times(1)).save(Mockito.any(Boat.class));
//    }
//
//
//    @Test
//    public void gettingBoatApiTest() throws Exception {
//        List<Boat> boats = new ArrayList<>();
//        boats.add(new Boat("null", 2, 42342L, 100,100,"True"));
//        boats.add(new Boat("null", 2,122,353,100, "True"));
//
//        when(boatRepository.findAll()).thenReturn(boats);
//
//        this.mockMvc.perform(get("/api/boats"))
//                .andDo(print())
//                .andExpect(jsonPath("$", hasSize(2)))
//                .andExpect(jsonPath("$[0].id", is(1)))
//                .andExpect(jsonPath("$[1].id", is(2)))
//                .andExpect(status().isOk());
//
//        Mockito.verify(boatRepository, times(1)).findAll();
//    }
//}
//
//
