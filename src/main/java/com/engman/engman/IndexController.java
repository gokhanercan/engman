package com.engman.engman;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class IndexController {
    @GetMapping("/hello")
    public String hello(@RequestParam(value = "name", defaultValue = "World 11") String name) {
        return String.format("Hey %s!", name);
    }
//    @GetMapping("/index")
//    public String index() {
//        //Model model = new
//        //model.addAttribute("name", name);
//        return "greeting";
//    }
}
