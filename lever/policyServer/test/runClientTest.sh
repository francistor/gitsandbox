#!/bin/bash

_REAL_SCRIPT_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

_HOME_DIR=${_REAL_SCRIPT_DIR}/..


(cd  ${_HOME_DIR}/test && export LOG_CONFIG_FILE=test-client-logging.json && node runUnitTest --hostName test-client &)
echo [TEST] Client launched
sleep 45
echo [TEST] Tests run

echo [TEST] Stopping client
curl --silent http://localhost:9001/agent/stop > /dev/null

sleep 2


