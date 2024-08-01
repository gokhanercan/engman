```mermaid
%%{init: {'theme': 'mermaid', 'themeVariables': {'fontFamily': 'Roboto'}}}%%


block-beta
    classDef sRect fill:white,stroke:lightgray,stroke-width:1px,rx:2px,ry:2px;
    classDef sTech fill:white,stroke:lightgray,stroke-width:1px,rx:2px,ry:2px;
    classDef sNoBox fill:transparent,stroke:transparent,stroke-width:0px;
    classDef sContainer fill:transparent,stroke:#f0f0f0,stroke-width:1px;rx:2px,ry:2px; 
    classDef sRoboto font-family:'Roboto', sans-serif,font-size:14px;

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
  
  block:Core
    columns 1
    CoreLabel["Core Layer"]
    block:Domain
        developers
        skills
        projects
        environments
    end
  end
  
class default sRoboto
class developers,skills,projects,environments sRect
class Hilla,SpringMVC,Spring,n,Core,React sTech
class TechLabel,HillaLabel,CoreLabel,Tech1,Core1 sNoBox
class Tech,Core sContainer

%%class HillaLabel,React sRoboto
