const markdownsWithOptions = { 
"monitoring": {
    "initialExpandLevel": "1",
    "colorFreezeLevel": "3",

    "markdownStr": 
`# MONITORING
- collect data
    - what data
        - metrics
            - counter
            - gauge
        - logs
            - structured
            - unstructured
        - traces
    - how
        - push model
            - agent
            - sidecar
            - service mesh
            - exporter
            - collector
            - gateway
        - pull model    
            - polling
            - long polling
            - streaming
- store data
    - metrics
        - influxdb
        - graphite
        - open-falcon
        - opentsdb
        - kairosdb
        - ganglia
        - zabbix
        - nagios
        - collectd
    - log
        - elasticsearch
        - splunk
        - graylog
        - logstash
        - fluentd
        - kafka
    - trace
        - jaeger
        - zipkin
        - skywalking
- use 
    - alerting
        - prometheus
        - alertmanager
        - icinga
    - visualization
        - grafana
        - kibana
        - tableau
        - superset
    - forecasting
        - prometheus
        - prophet
        - statsmodels
        - scikit-learn
        - tensorflow`
},
//----------------------------------------------------------------------------------------------------
"devops": {
    "initialExpandLevel": "1",
    "colorFreezeLevel": "2",

    "markdownStr": 
`# DEVOPS
- dev
    - 1 plan
    - 2 code
    - 3 build
- qa
    - 4 test
- ops
    - 5 deploy
    - 6 monitor`
},
//----------------------------------------------------------------------------------------------------
"siemens": {
    "initialExpandLevel": "1",
    "colorFreezeLevel": "5",

    "markdownStr": 
`# SIEMENS
- Advanta Group
    - evosoft
        - evosoft Hungary
            - departments
                - O1 
                - O2
                - O3
                - O4
                - O5
                - O6
            - sites
                - Budapest
                - Miskolc
                - Szeged`
},
//----------------------------------------------------------------------------------------------------
"design": {
    "initialExpandLevel": "1",
    "colorFreezeLevel": "3",

    "markdownStr":
`# DESIGN
- patterns
    - creational
        - factory method
        - abstract factory
        - builder
        - prototype
        - singleton
    - structural
        - adapter
        - bridge
        - composite
        - decorator
        - facade
        - flyweight
        - proxy
    - behavioral
        - chain of responsibility
        - command
        - interpreter
        - iterator
        - mediator
        - memento
        - observer
        - state
        - strategy
        - template method
        - visitor
- practices
    - SOLID
        - Single Responsibility Principle
        - Open/Closed Principle
        - Liskov Substitution Principle
        - Interface Segregation Principle
        - Dependency Inversion Principle
    - DRY
    - KISS
    - YAGNI
    - TDD
    - POLP
    - fail fast
    - fail safe
    - DDD
    - sad path first
    `
},
//----------------------------------------------------------------------------------------------------
"architecture": {
    "initialExpandLevel": "1",
    "colorFreezeLevel": "5",

    "markdownStr":
`# ARCHITECTURE
`
},
//----------------------------------------------------------------------------------------------------
"programming": {
    "initialExpandLevel": "1",
    "colorFreezeLevel": "5",

    "markdownStr":
`# PROGRAMMING THESIS
`
},
//----------------------------------------------------------------------------------------------------
"network": {
    "initialExpandLevel": "1",
    "colorFreezeLevel": "2",

    "markdownStr":
`
- NETWORK
LAYERS
    - physical
        - signal
        - topology
        - multiplexing
        - transmission
        - bandwidth
        - latency
        - jitter
        - throughput
        - error rate
        - attenuation
        - noise
    - data link
        - mac
        - frame
        - arp
        - flow control
        - error control
        - protocols
            - ethernet
            - wifi
            - bluetooth
    - network
        - ip
        - packet
        - icmp
        - routing
        - subnetting
        - tunneling
        - cidr
        - dhcp
        - nat
        - ipv6
        - ipv4
        - arp
        - dns
    - transport
        - fragment
        - tcp
        - udp
        - port
        - socket
        - congestion control
        - flow control
        - error control
    - application
        - http
        - https
        - smtp
        - ftp
        - ssh
`
},
}

export default markdownsWithOptions;