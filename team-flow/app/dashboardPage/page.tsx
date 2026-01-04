"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Layers3, Plus, ListChecks, TrendingUp, Calendar, MessageSquare, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import z from "zod"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"





const TaskFormSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória"),
  priority: z.enum(["low", "medium", "high"]),
  assignedTo: z.string().optional(),
  deadline: z.string().optional(),
})

type TaskFormData = z.infer<typeof TaskFormSchema>



const TaskSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  status: z.enum(["todo", "in-progress", "completed"]),
  assignedTo: z.string().optional(),
  deadline: z.string().optional(),
  priority: z.enum(["low", "medium", "high"]),
  comments: z.array(
    z.object({
      author: z.string(),
      text: z.string(),
      date: z.string()
    })
  )
})

type TaskSchemaType = z.infer<typeof TaskSchema>



type LoggedUser = {
    id: number,
    email: string,
    password: string
}



type Members = {
  id: string,
  email: string
}








export default function DashboardPage() {
   const [activeTab, setActiveTab] = useState("create")
  const [tasks, setTasks] = useState<TaskSchemaType[]>([])
  const [user, setUser] = useState<LoggedUser | null>(null)
  const [teamMembers, setTeamMembers] = useState<Members[]>([])
  const { register, handleSubmit, control} = useForm<TaskFormData>({
        resolver: zodResolver(TaskFormSchema), defaultValues: { priority: "medium" }
  })


  

   //Lógica para mostrar usuário logado
    useEffect(() =>{
        const storedUser = localStorage.getItem('user')

        if(storedUser){
            setUser(JSON.parse(storedUser))
        }

    }, [])



  




  //FUNÇÃO PARA BUSCAR OS MEMBROS DA EQUIPE
  useEffect(() => {
  async function fetchMembers() {
    try {
      const response = await fetch("/api/getMembers")

      if (!response.ok) return

      const data: Members[] = await response.json()
      setTeamMembers(data)
    } catch (err) {
      console.error("Erro ao buscar membros", err)
    }
  }

  fetchMembers()
}, [])











  // FUNÇÃO PARA CRIAR TAREFAS
  const handleCreateTask = async (data: TaskFormData)=> {
    
    try {

        const response = await fetch('/api/createTask', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                title: data.title,
                description: data.description,
                priority: data.priority,
                assignedTo: data.assignedTo,
                deadline: data.deadline
            })
        })


        if(!response.ok) {
            console.log("Erro ao se comunicar com a API")
            return
        }

        console.log('tarefa criada com sucesso!')

        const newTask = await response.json()

        setTasks(prev => [{...newTask, comments: newTask.comments ?? [] }, ...prev])


    } catch(e) {
        console.log(e)
        return
    }

    
  }







  // FUNÇÃO PARA LISTAR AS TASKS NA TABELA
  useEffect(()=>{

     async function fetchTasks(){

      try {

        const response = await fetch('/api/getTask')

        if(!response.ok){
          return
        }
   
        const data: TaskSchemaType[] = await response.json()

          const normalized = data.map(task => ({
          ...task,
          comments: task.comments ?? []
          }))

        setTasks(normalized)

      } catch(err){
        console.log("Erro ao encontrar tasks", err)

      }

    }


    fetchTasks()

  }, [])









const handleAssignTask = (taskId: string, memberId: string) => {
  const member = teamMembers.find((m) => m.id === memberId)

  if (!member) return

  setTasks(
    tasks.map((task) =>
      task.id === taskId ? { ...task, assignedTo: member.email } : task
    )
  )
}


















  const getStatusBadge = (status: TaskSchemaType["status"]) => {
    const variants = {
      todo: "secondary",
      "in-progress": "default",
      completed: "outline",
    } as const
    return <Badge variant={variants[status]}>{status.replace("-", " ")}</Badge>
  }








  const getPriorityBadge = (priority: TaskSchemaType["priority"]) => {
    const colors = {
      low: "text-green-700 bg-green-50 border-green-200",
      medium: "text-yellow-700 bg-yellow-50 border-yellow-200",
      high: "text-red-700 bg-red-50 border-red-200",
    }
    return <Badge className={colors[priority]}>{priority}</Badge>
  }





  const completedTasks = tasks.filter((t) => t.status === "completed").length
  const totalTasks = tasks.length
  const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0





  

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
              <Layers3 className="w-6 h-6 text-primary-foreground" />
            </div>
            <a href="/dashboardPage" className="text-2xl font-semibold">Teamflow</a>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                <User className="w-4 h-4 text-accent-foreground" />
              </div>
              <span className="text-sm font-medium">{user ? user.email.replace('@gmail.com', '') : "Carregando"}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="space-y-6">
          {/* Page Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight">Gerenciador de tarefas</h1>
            <p className="text-muted-foreground">
              Crie tarefas, atribua membros da equipe e acompanhe o progresso, tudo em um só lugar.
            </p>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="create" className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Crie tarefas
              </TabsTrigger>
              <TabsTrigger value="tasks" className="flex items-center gap-2">
                <ListChecks className="w-4 h-4" />
                Tarefas
              </TabsTrigger>
              <TabsTrigger value="progress" className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Progresso
              </TabsTrigger>
            </TabsList>

            {/* Create Task Tab */}
            <TabsContent value="create">
              <Card>
                <CardHeader>
                  <CardTitle>Crie uma nova tarefa</CardTitle>
                  <CardDescription>Preencha o formulário abaixo para criar uma nova tarefa para sua equipe.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit(handleCreateTask)} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="title">Título da tarefa</Label>
                      <Input
                        id="title"
                        placeholder="Enter task title..."
                        required
                        {...register('title')}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Descrição</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe the task in detail..."
                        rows={4}
                        required
                        {...register('description')}
                      />
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        <div className="space-y-2">
                            <Label htmlFor="priority">Prioridade</Label>
                            <Controller
                                name="priority"
                                control={control}
                                render={({ field }) => (
                                <Select
                                value={field.value}
                                onValueChange={field.onChange}
                                >
                                <SelectTrigger id="priority">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="low">Baixa</SelectItem>
                                    <SelectItem value="medium">Média</SelectItem>
                                    <SelectItem value="high">Alta</SelectItem>
                                </SelectContent>
                                </Select>
                            )}
                            />
                        </div>

                      <div className="space-y-2">
                    <Label htmlFor="assignee">Atribuir a</Label>
                    <Controller
                    name="assignedTo"
                    control={control}
                    render={({ field }) => (
                        <Select
                        value={field.value || undefined}
                        onValueChange={field.onChange}
                        >
                        <SelectTrigger id="assignee">
                            <SelectValue placeholder="Select member" />
                        </SelectTrigger>
                        <SelectContent>
                            {teamMembers.map((member) => (
                            <SelectItem key={member.id} value={member.email}>
                                {member.email}
                            </SelectItem>
                            ))}
                        </SelectContent>
                        </Select>
                    )}
                    />
                </div>

                      <div className="space-y-2">
                        <Label htmlFor="deadline">Prazo</Label>
                        <Input
                          id="deadline"
                          type="date"
                          {...register('deadline')}
                        />
                      </div>
                    </div>

                    <Button type="submit" className="w-full md:w-auto">
                      <Plus className="w-4 h-4 mr-2" />
                      Crie uma tarefa
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

















            {/* Tasks Tab */}
            <TabsContent value="tasks">
              <Card>
                <CardHeader>
                  <CardTitle>Todas as tarefas</CardTitle>
                  <CardDescription>Visualizar e gerenciar tarefas, atribuir membros da equipe</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Tarefa</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Prioridade</TableHead>
                          <TableHead>Atribuído a</TableHead>
                          <TableHead>Prazo</TableHead>
                          <TableHead>Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {tasks.map((task) => (
                          <TableRow key={task.id}>
                            <TableCell>
                              <div className="space-y-1">
                                <div className="font-medium">{task.title}</div>
                                <div className="text-sm text-muted-foreground line-clamp-1">{task.description}</div>
                              </div>
                            </TableCell>
                            <TableCell>{getStatusBadge(task.status)}</TableCell>
                            <TableCell>{getPriorityBadge(task.priority)}</TableCell>
                            <TableCell>
                              <Select
                                value={teamMembers.find((m) => m.email === task.assignedTo)?.id || ""}
                                onValueChange={(value) => handleAssignTask(task.id, value)}
                              >
                                <SelectTrigger className="w-40">
                                  <SelectValue placeholder="Assign..." />
                                </SelectTrigger>
                                <SelectContent>
                                  {teamMembers.map((member) => (
                                    <SelectItem key={member.id} value={member.id}>
                                      {member.email}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </TableCell>
                            <TableCell>

                                {/*prazo*/}
                              {task.deadline ? (
                                <div className="flex items-center gap-1 text-sm">
                                  <Calendar className="w-3 h-3 text-muted-foreground" />
                                  {new Date(task.deadline).toLocaleDateString()}
                                </div>
                              ) : (
                                <span className="text-sm text-muted-foreground">Sem prazo</span>
                              )}
                            </TableCell>
                            <TableCell>
                              <Button variant="outline" size="sm">
                                Edição
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>













            {/* Progress Tab */}
            <TabsContent value="progress">
              <div className="space-y-6">
                {/* Progress Overview */}
                <Card>
                  <CardHeader>
                    <CardTitle>Progresso do projeto</CardTitle>
                    <CardDescription>Acompanhe a conclusão geral do projeto e os prazos futuros</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">Progresso Geral</span>
                        <span className="text-muted-foreground">
                          {completedTasks} de {totalTasks} tarefas concluídas
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-secondary overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all duration-300"
                          style={{ width: `${progressPercentage}%` }}
                        />
                      </div>
                      <p className="text-2xl font-semibold">{progressPercentage}%</p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="space-y-1 rounded-lg border border-border p-4">
                        <p className="text-sm text-muted-foreground">A fazer</p>
                        <p className="text-2xl font-semibold">{tasks.filter((t) => t.status === "todo").length}</p>
                      </div>
                      <div className="space-y-1 rounded-lg border border-border p-4">
                        <p className="text-sm text-muted-foreground">Em progresso</p>
                        <p className="text-2xl font-semibold">
                          {tasks.filter((t) => t.status === "in-progress").length}
                        </p>
                      </div>
                      <div className="space-y-1 rounded-lg border border-border p-4">
                        <p className="text-sm text-muted-foreground">Completado</p>
                        <p className="text-2xl font-semibold">{completedTasks}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>





                {/* Task Details with Comments */}
                <div className="space-y-4">
                  {tasks.map((task) => (
                    <Card key={task.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <CardTitle className="text-lg">{task.title}</CardTitle>
                            <CardDescription>{task.description}</CardDescription>
                          </div>
                          <div className="flex items-center gap-2">
                            {getPriorityBadge(task.priority)}
                            {getStatusBadge(task.status)}
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
                          {task.assignedTo && (
                            <div className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              {task.assignedTo}
                            </div>
                          )}
                          {task.deadline && (
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                             Vencimento {new Date(task.deadline).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* Comments Section */}
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-sm font-medium">
                            <MessageSquare className="w-4 h-4" />
                            Comentários ({task.comments.length})
                          </div>

                          {task.comments.length > 0 && (
                            <div className="space-y-2">
                              {task.comments.map((comment, idx) => (
                                <div key={idx} className="rounded-lg bg-muted p-3 space-y-1">
                                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <span className="font-medium text-foreground">{comment.author}</span>
                                    <span>•</span>
                                    <span>{new Date(comment.date).toLocaleDateString()}</span>
                                  </div>
                                  <p className="text-sm">{comment.text}</p>
                                </div>
                              ))}
                            </div>
                          )}

                          <form
                         
                            className="flex gap-2"
                          >
                            <Input name="comment" placeholder="Add a comment..." className="flex-1" />
                            <Button type="submit" size="sm">
                              Publicar
                            </Button>
                          </form>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
