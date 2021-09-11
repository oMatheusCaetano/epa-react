import Swal from 'sweetalert2';
import { useTheme } from 'styled-components';

enum SwalIcons {
  ERROR = 'error',
  SUCCESS = 'success',
  WARNING = 'warning',
  INFO = 'info',
  QUESTION = 'question',
}

export function useDialog() {
  const theme = useTheme();

  return {
    await: ({ text = '', title = 'Aguarde' }) => Swal.fire({ title, text, showConfirmButton: false, allowOutsideClick: false }),

    close: () => Swal.close(),

    confirm: async ({
      text = '',
      title = '',
      confirmButtonText = 'Sim, tenho certeza!',
      cancelButtonText = 'Não, quero cancelar!',
    }) => {
      const { value } = await Swal.fire({
        icon: SwalIcons.WARNING,
        title,
        text,
        showCancelButton: true,
        confirmButtonColor: theme.colors.primary,
        cancelButtonColor: theme.colors.danger,
        confirmButtonText,
        cancelButtonText,
      });

      return !!value;
    },

    error: async ({ text = '', title = 'Oops...' }) => Swal.fire({ icon: SwalIcons.ERROR, title, text, confirmButtonColor: theme.colors.primary }),

    success: ({ text = '', title = '' }) => {
      Swal.fire({
        icon: SwalIcons.SUCCESS,
        title,
        text,
        showConfirmButton: true,
        timer: 1500,
      });
    },
  };
}
