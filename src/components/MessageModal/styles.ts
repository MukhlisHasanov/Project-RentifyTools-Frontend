import { colors } from 'styles/colors'

export const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: `${colors.FOOTER}`,
  color: 'white',
  boxShadow: 24,
  border: '2px solid white',
  p: 4,
  borderRadius: 2,
}
