#!/bin/bash

exec ./scripts/create_quality_profile_and_quality_gate_sonar.sh &
exec ./docker/entrypoint.sh
