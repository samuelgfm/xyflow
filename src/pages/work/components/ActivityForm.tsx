import React from 'react';
import { useForm } from 'react-hook-form';
import { useCompany } from '@/contexts/CompanyContext';
import { useWork } from '@/contexts/WorkContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type ActivityFormProps = {
  defaultValues?: {
    id?: string;
    name: string;
    description: string;
    departmentId: string;
  };
  onSuccess?: () => void;
};

const ActivityForm: React.FC<ActivityFormProps> = ({ defaultValues, onSuccess }) => {
  const { departments } = useCompany();
  const { addActivity, updateActivity } = useWork();
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: defaultValues || {
      name: '',
      description: '',
      departmentId: '',
    },
  });

  const onSubmit = async (data: any) => {
    if (defaultValues?.id) {
      await updateActivity({ ...data, id: defaultValues.id, tasks: [] });
    } else {
      await addActivity(data);
    }
    if (onSuccess) onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input placeholder="Nome da atividade" {...register('name')} />
      <Input placeholder="Descrição" {...register('description')} />

      <Select value={watch('departmentId')} onValueChange={(value) => setValue('departmentId', value)}>
        <SelectTrigger>
          <SelectValue placeholder="Selecione um departamento" />
        </SelectTrigger>
        <SelectContent>
          {departments.map((dept) => (
            <SelectItem key={dept.id} value={dept.id}>
              {dept.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button type="submit">
        {defaultValues?.id ? 'Atualizar' : 'Criar'} Atividade
      </Button>
    </form>
  );
};

export default ActivityForm;
