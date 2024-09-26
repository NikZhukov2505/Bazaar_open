import React, { FC } from 'react';
import { useAppSelector } from '../../../store/hooks/hooks';
import { pathLink } from '../../../reused';
import { Link } from 'react-router-dom';
import empty from '../../../assets/PersonalProfile/empty.png'
import profile from '../../../assets/Header/profile.png'
import s from '../Header.module.scss'

interface UserIconProps {
    toggleClose: () => void
}

const UserIcon: FC<UserIconProps> = ({ toggleClose }) => {
    const { token, user } = useAppSelector(state => state.user)

    return (
        <>
            {token ? (
                <Link to={'/personal-area'} className={s.profile_icon}>
                    <img
                        className={s.profile_img}
                        src={
                            user?.seller_user?.avatar
                                ? user.seller_user.avatar.toString().startsWith('http')
                                    ? `https${user.seller_user.avatar.slice(4)}`
                                    : pathLink + user?.seller_user?.avatar
                                : empty
                        }
                        alt='user_avatar'
                    />
                </Link>
            ) : (
                <img
                    className={s.icons}
                    onClick={toggleClose}
                    src={profile}
                    alt='Profile'
                />
            )}
        </>
    );
};

export default UserIcon;