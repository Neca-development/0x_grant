import Modal from '@components/shared/modal/modal.component'
import { useAppDispatch, useAppSelector } from '@hooks/use-app-dispatch.hook'
import useModal from '@hooks/use-modal.hook'
import styles from '@pages/home/home.module.scss'
import { fetchUsers } from '@store/users/users.actions'
import * as React from 'react'

export interface IMainHomeProps {}

export default function Home(props: IMainHomeProps) {
  const dispatch = useAppDispatch()
  // example of using redux store useAppSelector return one of slices
  const { users, isLoading, error } = useAppSelector(
    (state: { usersReducer: any }) => state.usersReducer
  )

  const { isOpen, toggle } = useModal()

  React.useEffect(() => {
    // example of using rtk thunk
    dispatch(fetchUsers())
  }, [])

  return (
    <div className={styles.container}>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <Modal isOpen={isOpen} toggle={toggle}>
        <Modal.Body>{JSON.stringify(users, null, 2)}</Modal.Body>
      </Modal>

      <button className={styles.homeButton} onClick={() => toggle()}>
        Open Modal
      </button>
    </div>
  )
}
