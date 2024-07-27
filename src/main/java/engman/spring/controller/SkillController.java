package engman.spring.controller;

import engman.spring.services.concretes.SkillManager;
import engman.spring.services.requests.CreateSkillRequest;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/skills")
@AllArgsConstructor
@Controller
public class SkillController {

    @Autowired
    SkillManager skillManager;      //Repository ???


//    @ResponseStatus(code = HttpStatus.CREATED)
    @PostMapping("/addSkill")
    public String addNewSkill(@ModelAttribute("createSkill") CreateSkillRequest createSkillRequest){
        skillManager.addSkill(createSkillRequest);
        return "redirect:/api/skills/getAllSkills";
    }

    @GetMapping("/getAllSkills")
    public String getSkills(Model model){
        model.addAttribute("skills", skillManager.getSkills());
        return "get_skills";
    }


    @GetMapping("/addSkill")
    public String addSkillForm(Model model){
        model.addAttribute("createSkill", new CreateSkillRequest());
        return "add_skill";
    }

}
