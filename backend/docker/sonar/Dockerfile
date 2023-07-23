FROM sonarqube:9.9.1-community

USER root

RUN apt update && apt install curl jq -y

RUN mkdir -p /opt/sonarqube/scripts
WORKDIR /opt/sonarqube

COPY ./scripts /opt/sonarqube/scripts

RUN chown -R 1000:1000 /opt/sonarqube/scripts

# Grant permissions for to our scripts to be executable
RUN chmod +x /opt/sonarqube/scripts/create_quality_profile_and_quality_gate_sonar.sh
RUN chmod +x /opt/sonarqube/scripts/entrypoint.sh

USER sonarqube

ENTRYPOINT ["./scripts/entrypoint.sh"]