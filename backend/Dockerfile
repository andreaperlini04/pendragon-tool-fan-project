# Stage 1: Build the application with Maven
FROM maven:3.8-openjdk-17 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the Maven wrapper files
COPY .mvn/ .mvn
COPY mvnw .
COPY pom.xml .

# --- ADD THIS LINE ---
# Grant executable permission to the Maven wrapper
RUN chmod +x mvnw

# Download dependencies (this is cached to speed up future builds)
RUN ./mvnw dependency:go-offline

# Copy the rest of your source code
COPY src ./src

# Build the application, skipping tests
RUN ./mvnw clean package -DskipTests


# Stage 2: Create the final, small runtime image
FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]