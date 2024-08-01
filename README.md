```mermaid

block-beta
    classDef sRect fill:white,stroke:lightgray,stroke-width:1px,rx:2px,ry:2px;
    classDef sTech fill:white,stroke:lightgray,stroke-width:1px,rx:2px,ry:2px;
    classDef sNoBox fill:transparent,stroke:transparent,stroke-width:0px;
    
    columns 1
    block:Tech
        TechLabel["Tech Layer"]
        SpringMVC
        block:Hilla
            columns 1
                HillaLabel["Hilla"]
                React
                Spring["Spring Boot"]
        end
        n["..."]
   end
  
  space

  block:Core
    columns 1
    CoreLabel["Core"]
    block:Domain
        developers
        skills
        projects
        environments
    end
  end
    
  Hilla-->Core
  SpringMVC-->Core
  
class developers,skills,projects,environments sRect
class Hilla,SpringMVC,Spring,n,Core,React sTech
class TechLabel,HillaLabel,CoreLabel sNoBox

