.h3 Requirements

Node.js, Node Package Manager

.h3 Build

CMD > npm init

.h3 Run

in CMD > node index.js -?

with ? being c, s or w for starting a new client, server or worker respectively.

.h2 How it works

.h3 Plan

Multiple Cliends can connect to a Server via [client] REQ > ROUTER [server]

The Server distributes the tasks, acting as a broker: [server] DEALER > REP [worker]

The Worker sends its answer to the server: [client] REQ > ROUTER [server], so that the server knows the worker just became available.

The Server answers the client: [server] ROUTER > [client] REQ