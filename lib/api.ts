export class Api {
  private apiKey?: string

  constructor(apiKey?: string) {
    this.apiKey = apiKey
  }

  async fetchFromApi(
    endpoint: string,
    options: RequestInit = {},
    searchParams: Record<string, any> = {}
  ) {

    console.log("lib>api.ts>API>fetchFromApi-> line -> 14")
    console.log(`${process.env.NEXT_PUBLIC_SUPERAGENT_API_URL}${endpoint}`)
    const url = new URL(
      `${process.env.NEXT_PUBLIC_SUPERAGENT_API_URL}${endpoint}`
    )

    Object.entries(searchParams).forEach(([key, value]) => {
      url.searchParams.append(key, value)
    })

    const response = await fetch(url.toString(), {
      ...options,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${this.apiKey}`,
        ...options.headers,
      },
    })

    return await response.json()
  }

  async indentifyUser(payload: any) {
    console.log("lib>api.ts>API>indentifyUser-> line -> 34")
    console.log('/api-users/identify')

    return this.fetchFromApi("/api-users/identify", {
      method: "POST",
      body: JSON.stringify(payload),
      mode: 'no-cors',
    })
  }

  async createAgent(payload: any) {
    console.log("lib>api.ts>API>createAgent-> line -> 45")
    console.log('/agents')
    return this.fetchFromApi("/agents", {
      method: "POST",
      body: JSON.stringify(payload),
    })
  }

  async createAgentLLM(agentId: string, llmId: string) {
    console.log("lib>api.ts>API>createAgentLLM-> line -> 54")
    console.log(`/agents/${agentId}/llms`)
    return this.fetchFromApi(`/agents/${agentId}/llms`, {
      method: "POST",
      body: JSON.stringify({ llmId }),
    })
  }

  async createAgentTool(agentId: string, toolId: string) {
    console.log("lib>api.ts>API>createAgentTool-> line -> 63")
    console.log(`/agents/${agentId}/tools`)

    return this.fetchFromApi(`/agents/${agentId}/tools`, {
      method: "POST",
      body: JSON.stringify({ toolId }),
    })
  }

  async createApiUser(payload: any) {
    console.log("lib>api.ts>API>createApiUser-> line -> 73")
    console.log("/api-users")

    return this.fetchFromApi("/api-users", {
      method: "POST",
      body: JSON.stringify(payload),
    })
  }

  async createApiKey(payload: any) {
    console.log("lib>api.ts>API>createApiKey-> line -> 83")
    console.log("/api-keys")
    return this.fetchFromApi("/api-keys", {
      method: "POST",
      body: JSON.stringify(payload),
    })
  }

  async getApiKeys() {
    console.log("lib>api.ts>API>getApiKeys-> line -> 92")
    console.log("/api-keys")
    return this.fetchFromApi("/api-keys")
  }

  async updateApiKey(id: string, payload: any) {
    console.log("lib>api.ts>API>updateApiKey-> line -> 98")
    console.log(`/api-keys/${id}`)

    return this.fetchFromApi(`/api-keys/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    })
  }

  async deleteApiKey(id: string) {
    console.log("lib>api.ts>API>deleteApiKey-> line -> 108")
    console.log(`/api-keys/${id}`)

    return this.fetchFromApi(`/api-keys/${id}`, { method: "DELETE" })
  }

  async createDatasource(payload: any) {
    console.log("lib>api.ts>API>createDatasource-> line -> 115")
    console.log("/datasources")

    return this.fetchFromApi("/datasources", {
      method: "POST",
      body: JSON.stringify(payload),
    })
  }

  async createAgentDatasource(agentId: string, datasourceId: string) {
    console.log("lib>api.ts>API>createAgentDatasource-> line -> 125")
    console.log(`/agents/${agentId}/datasources`)

    return this.fetchFromApi(`/agents/${agentId}/datasources`, {
      method: "POST",
      body: JSON.stringify({ datasourceId }),
    })
  }

  async createLLM(payload: any) {
    console.log("lib>api.ts>API>createLLM-> line -> 135")
    console.log("/llms")
    return this.fetchFromApi("/llms", {
      method: "POST",
      body: JSON.stringify(payload),
    })
  }

  async createTool(payload: any) {
    console.log("lib>api.ts>API>createTool-> line -> 145")
    console.log("/tools")
    return this.fetchFromApi("/tools", {
      method: "POST",
      body: JSON.stringify(payload),
    })
  }

  async deleteAgentLLM(agentId: string, llmId: string) {
    console.log("lib>api.ts>API>deleteAgentLLM-> line -> 153")
    console.log(`/agents/${agentId}/llms/${llmId}`)
    return this.fetchFromApi(`/agents/${agentId}/llms/${llmId}`, {
      method: "DELETE",
    })
  }

  async deleteAgentById(id: string) {
    console.log("lib>api.ts>API>deleteAgentById-> line -> 153")
    console.log(`/agents/${id}`)
    return this.fetchFromApi(`/agents/${id}`, { method: "DELETE" })
  }

  async deleteAgentTool(id: string, toolId: string) {
    console.log("lib>api.ts>API>deleteAgentTool-> line -> 167")
    console.log(`/agents/${id}/tools/${toolId}`)
    return this.fetchFromApi(`/agents/${id}/tools/${toolId}`, {
      method: "DELETE",
    })
  }

  async deleteAgentDatasource(id: string, datasourceId: string) {
    console.log("lib>api.ts>API>deleteAgentDatasource-> line -> 175")
    console.log(`/agents/${id}/datasources/${datasourceId}`)
    return this.fetchFromApi(`/agents/${id}/datasources/${datasourceId}`, {
      method: "DELETE",
    })
  }

  async deleteDatasource(id: string) {
    console.log("lib>api.ts>API>deleteDatasource-> line -> 175")
    console.log(`/datasources/${id}`)

    return this.fetchFromApi(`/datasources/${id}`, { method: "DELETE" })
  }

  async deleteTool(id: string) {
    console.log("lib>api.ts>API>deleteTool-> line -> 190")
    console.log(`/tools/${id}`)
    return this.fetchFromApi(`/tools/${id}`, { method: "DELETE" })
  }

  async getAgents(
    searchParams: { take?: number; skip?: number } = { skip: 0, take: 300 }
  ) {
    console.log("lib>api.ts>API>getAgents-> line -> 198")
    console.log("/agents")
    return this.fetchFromApi("/agents", {}, searchParams)
  }

  async getAgentById(id: string) {
    console.log("lib>api.ts>API>getAgentById-> line -> 204")
    console.log(`/agents/${id}`)
    return this.fetchFromApi(`/agents/${id}`)
  }

  async getAgentRuns(id: string) {
    console.log("lib>api.ts>API>getAgentRuns-> line -> 210")
    console.log(`/agents/${id}/runs`)
    return this.fetchFromApi(`/agents/${id}/runs`)
  }

  async getDatasources(
    searchParams: { take?: number; skip?: number } = { skip: 0, take: 50 }
  ) {
    console.log("lib>api.ts>API>getDatasources-> line -> 218")
    console.log(`/datasources`)
    return this.fetchFromApi(`/datasources`, {}, searchParams)
  }

  async getLLMs() {
    console.log("lib>api.ts>API>getLLMs-> line -> 224")
    console.log(`/llms`)
    return this.fetchFromApi(`/llms`)
  }

  async getTools(
    searchParams: { take?: number; skip?: number } = { skip: 0, take: 50 }
  ) {
    console.log("lib>api.ts>API>getTools-> line -> 232")
    console.log(`/tools`)
    return this.fetchFromApi("/tools", {}, searchParams)
  }

  async getRuns(searchParams?: {
    workflow_id?: string
    agent_id?: string
    limit?: number
    from_page?: number
    to_page?: number
  }) {
    console.log("lib>api.ts>API>getRuns-> line -> 244")
    console.log(`/runs`)
    return this.fetchFromApi("/runs", {}, searchParams)
  }

  async patchAgent(id: string, payload: any) {
    console.log("lib>api.ts>API>patchAgent-> line -> 250")
    console.log(`/agents/${id}`)
    return this.fetchFromApi(`/agents/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    })
  }

  async patchDatasource(id: string, payload: any) {
    console.log("lib>api.ts>API>patchDatasource-> line -> 259")
    console.log(`/datasources/${id}`)
    return this.fetchFromApi(`/datasources/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    })
  }

  async patchLLM(id: string, payload: any) {
    console.log("lib>api.ts>API>patchLLM-> line -> 268")
    console.log(`/llms/${id}`)
    return this.fetchFromApi(`/llms/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    })
  }

  async patchTool(id: string, payload: any) {
    console.log("lib>api.ts>API>patchTool-> line -> 277")
    console.log(`/tools/${id}`)
    return this.fetchFromApi(`/tools/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    })
  }

  async getWorkflows(
    searchParams: { take?: number; skip?: number } = { skip: 0, take: 50 }
  ) {
    console.log("lib>api.ts>API>getWorkflows-> line -> 288")
    console.log('workflows')
    return this.fetchFromApi("/workflows", {}, searchParams)
  }

  async getWorkflowById(id: string) {
    console.log("lib>api.ts>API>getWorkflowById-> line -> 288")
    console.log(`/workflows/${id}`)
    return this.fetchFromApi(`/workflows/${id}`)
  }

  async createWorkflow(payload: any) {
    console.log("lib>api.ts>API>createWorkflow-> line -> 288")
    console.log("/workflows")
    return this.fetchFromApi("/workflows", {
      method: "POST",
      body: JSON.stringify(payload),
    })
  }

  async generateWorkflow(workflowId: string, payload: any) {
    console.log("lib>api.ts>API>generateWorkflow-> line -> 309")
    console.log( `${process.env.NEXT_PUBLIC_SUPERAGENT_API_URL}/workflows/${workflowId}/config`)
    // TODO: update fetchFromApi and use it
    return fetch(
      `${process.env.NEXT_PUBLIC_SUPERAGENT_API_URL}/workflows/${workflowId}/config`,
      {
        method: "POST",
        body: payload,
        headers: {
          "Content-Type": "application/x-yaml",
          authorization: `Bearer ${this.apiKey}`,
        },
      }
    )
  }

  async getWorkflowSteps(id: string) {
    console.log("lib>api.ts>API>getWorkflowSteps-> line -> 326")
    console.log(`/workflows/${id}/steps`)
    return this.fetchFromApi(`/workflows/${id}/steps`)
  }

  async createWorkflowStep(workflowId: string, payload: any) {
    console.log("lib>api.ts>API>createWorkflowStep-> line -> 332")
    console.log(`/workflows/${workflowId}/steps`)
    return this.fetchFromApi(`/workflows/${workflowId}/steps`, {
      method: "POST",
      body: JSON.stringify(payload),
    })
  }

  async patchWorkflowStep(workflowId: string, stepId: string, payload: any) {
    console.log("lib>api.ts>API>patchWorkflowStep-> line -> 341")
    console.log(`/workflows/${workflowId}/steps/${stepId}`)

    return this.fetchFromApi(`/workflows/${workflowId}/steps/${stepId}`, {
      
      method: "PATCH",
      body: JSON.stringify(payload),
    })
  }

  async deleteWorkflowStep(workflowId: string, stepId: string) {
    console.log("lib>api.ts>API>deleteWorkflowStep-> line -> 352")
    console.log(`/workflows/${workflowId}/steps/${stepId}`)
    return this.fetchFromApi(`/workflows/${workflowId}/steps/${stepId}`, {
      method: "DELETE",
    })
  }

  async patchWorkflow(workflowId: string, payload: any) {
    console.log("lib>api.ts>API>patchWorkflow-> line -> 360")
    console.log(`/workflows/${workflowId}`)
    return this.fetchFromApi(`/workflows/${workflowId}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    })
  }

  async deleteWorkflow(workflowId: string) {
    console.log("lib>api.ts>API>deleteWorkflow-> line -> 369")
    console.log(`/workflows/${workflowId}`)

    return this.fetchFromApi(`/workflows/${workflowId}`, {
      method: "DELETE",
    })
  }

  async getVectorDbs() {
    console.log("lib>api.ts>API>getVectorDbs-> line -> 378")
    console.log(`/vector-dbs`)
    return this.fetchFromApi(`/vector-dbs`)
  }

  async createVectorDb(payload: any) {
    console.log("lib>api.ts>API>createVectorDb-> line -> 384")
    console.log(`/vector-db`)
    return this.fetchFromApi("/vector-db", {
      method: "POST",
      body: JSON.stringify(payload),
    })
  }

  async patchVectorDb(id: string, payload: any) {
    console.log("lib>api.ts>API>patchVectorDb-> line -> 393")
    console.log(`/vector-dbs/${id}`)
    return this.fetchFromApi(`/vector-dbs/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    })
  }

  async deleteVectorDb(id: string) {
    console.log("lib>api.ts>API>deleteVectorDb-> line -> 402")
    console.log(`/vector-dbs/${id}`)
    return this.fetchFromApi(`/vector-dbs/${id}`, {
      method: "DELETE",
    })
  }
}
