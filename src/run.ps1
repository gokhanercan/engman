cd core
mvn compile test
if ($LASTEXITCODE -ne 0) {
    Write-Host "Maven test failed in 'Core' module."
    exit $LASTEXITCODE
}
cd..
cd hilla
mvn