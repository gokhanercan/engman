# Modules
## 1. Core (/core Submodule)
This is the kernel/domain layer of the project. We keep it abstracted away from technology as much as possible.

## 2. Hilla Tech (/hilla Submodule)
Hilla is an integrated full-stack Java/JS stack. This will be Engman's primary tech implementation.

## 3. SpringBoot Tech (/spring Submodule)
'Spring' implementation is a submodule, similar to 'Hilla'. Both uses 'Core' submodule.

### Compile Spring
``
mvn compile
``
### Dev Run Spring
``
mvn spring-boot:run
``

Check out http://localhost:8080/