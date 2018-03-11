# NodeJS Task Queue

Implements an express server capable of queuing tasks for delayed execution. This is useful for immediately responding an user request and trigger a task that can not be readily completed (eg. a long calculation, file processing, ...).

This project is intended for learning with a simple implementation and by no means should be taken as a reference. There are mature tools to solve this problem, like Kue. It is however made public and free software in the hopes it might be interesting or helpful to someone.

## Implementation

To model the problem without actually dealing with a complex server-side process, a math operations server is implemented. Addition can be submitted to the `POST /math/sum` endpoint with a JSON body like this:

```JSON
{
  "id" : "abc123_some_unique_id",
  "a" : "2",
  "b" : "2"
}
```

The id will be used to fetch the result of a+b at the endpoint `GET /results/_id`

The task queue is built entirely on top of mongoose in order to keep things simple and explore building the system from scratch.
