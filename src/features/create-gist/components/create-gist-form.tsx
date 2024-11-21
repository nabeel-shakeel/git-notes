import { useNavigate } from 'react-router-dom';
import { Stack, TextField, Button, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { routes } from '../../../routing';
import { useCreateGistMutation } from '../../gists/gistsApiSlice';
import { createGistSchema } from '../create-gist.schema';

type GistFormValues = z.infer<typeof createGistSchema>;

export function CreateGistForm() {
  const navigate = useNavigate();
  const [createGist, { isLoading }] = useCreateGistMutation();
  const { control, handleSubmit, reset } = useForm<GistFormValues>({
    resolver: zodResolver(createGistSchema),
    defaultValues: {
      description: '',
      files: [{ filename: '', content: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'files',
  });

  const onSubmit = async (data: GistFormValues) => {
    const payload = {
      description: data.description,
      public: true,
      files: data.files.reduce((acc, file) => {
        acc[file.filename] = { content: file.content };
        return acc;
      }, {} as Record<string, { content: string }>),
    };

    try {
      await createGist(payload).unwrap();
      alert('Gist created successfully!');
      reset();
      navigate(routes.PROFILE, {
        state: { gistType: 'all' },
      });
    } catch (error) {
      alert('Failed to create gist.');
    }
  };

  return (
    <Stack
      spacing={2}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <Controller
        name="description"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            placeholder="This is a Git Description"
            fullWidth
            size="small"
            margin="normal"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />

      {fields.map((field, index) => (
        <Stack
          key={field.id}
          sx={{ border: '1px solid #EFEFEF', borderRadius: '4px' }}
          alignItems="stretch"
        >
          <Stack
            direction="row"
            justifyContent="flex-start"
            spacing={2}
            sx={{ backgroundColor: '#FAFAFA', padding: 1 }}
          >
            <Controller
              name={`files.${index}.filename`}
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  sx={{ borderColor: '#7A7A7A' }}
                  placeholder="filename.txt"
                  size="small"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
            <IconButton onClick={() => remove(index)}>
              <Delete />
            </IconButton>
          </Stack>
          <Controller
            name={`files.${index}.content`}
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                placeholder="This is a Git Content"
                fullWidth
                multiline
                rows={5}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </Stack>
      ))}

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Button
          type="button"
          variant="contained"
          onClick={() => append({ filename: '', content: '' })}
          sx={{ mb: 2 }}
        >
          Add File
        </Button>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isLoading}
        >
          {isLoading ? 'Creating...' : 'Create Gist'}
        </Button>
      </Stack>
    </Stack>
  );
}
