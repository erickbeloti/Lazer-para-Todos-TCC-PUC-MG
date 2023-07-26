FROM eclipse-temurin:17-jdk-alpine AS MAVEN_BUILD

WORKDIR /build

COPY .mvn .mvn
COPY mvnw .
COPY pom.xml .
COPY src src

RUN chmod +x ./mvnw

RUN ./mvnw clean package

FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

COPY --from=MAVEN_BUILD /build/target/*.jar app.jar

ENV PORT 8080

EXPOSE $PORT
ENTRYPOINT ["java", "-jar", "-XX:TieredStopAtLevel=1", "-noverify", "-Dserver.port=${PORT}", "app.jar"]