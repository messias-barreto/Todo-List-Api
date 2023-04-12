interface ITodoDTO { 
    id?: string;
    title: string;
    description?: string;
    status: number;
    project_id: string;
    created_at?: Date;
    updated_at?: Date;
}

export { ITodoDTO }