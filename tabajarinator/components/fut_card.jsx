import { Rating } from '@mui/material';
import axios from 'axios';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { FaBan, FaCheck } from 'react-icons/fa';
import Switch from '@mui/material/Switch';
import { MdStarOutline } from 'react-icons/md';
import { IoCheckmarkCircleOutline, IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import GoleiroIcon from '../public/svg/goleiro.svg';
import MarcacaoIcon from '../public/svg/marcacao.svg';
import VelocidadeIcon from '../public/svg/velocidade.svg';
import HabilidadeIcon from '../public/svg/habilidade.svg';
import RacaIcon from '../public/svg/raca.svg';

export default function FUTCard(props) {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isAdvancedOptions, setIsAdvancedOptions] = useState(false);
    const [hover, setHover] = useState(0);
    const [ratings, setRatings] = useState({
        overall: props.initialRating || 0,
        pace: 0,
        shooting: 0,
        passing: 0,
        dribbling: 0,
        defending: 0
    });

    // Update ratings when props change
    useEffect(() => {
        setRatings(prev => ({
            ...prev,
            overall: props.initialRating || 0
        }));
    }, [props.initialRating]);

    const labelsGoleiro = {
        0.5: 'Não consegue ver a bola',
        1: 'Desvia da bola',
        1.5: 'Desvia da bola',
        2: 'Se for nele, defende',
        2.5: 'Se for nele, defende',
        3: 'Sai na bola',
        3.5: 'Sai na bola',
        4: 'Pula',
        4.5: 'Pula no ângulo',
        5: 'Cortois'
    }

    const handleAttributeRating = (attribute, rating) => {
        if (props.isCurrentUser) {
            return;
        }

        setRatings(prev => ({ ...prev, [attribute]: rating }));
        
        setTimeout(async () => {
            try {
                await axios.post('http://localhost:8000/api/ratings/create/', {
                    rated: props.idRated,
                    [attribute]: rating,
                }, {
                    headers: {
                        Authorization: `Token ${localStorage.getItem('token')}`,
                    },
                });
            } catch (error) {
                console.error('Erro ao criar avaliação de atributo:', error);
            }
        }, 500);
    };

    const handleFlip = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsFlipped(!isFlipped);
    };

    return (  
        <div className="wrapper">
            <div className={`fut-player-card ${isFlipped ? 'flipped' : ''}`}>
                <div className="card-front">
                    <div className="player-card-top">
                        <div className="player-master-info">
                            {/* TODO: implementar com que o rating só seja visto se o jogador já tiver pelo menos 5 avaliações e o usuário já o tenha avaliado */}
                            <div className="player-rating"><span>97</span></div> 
                            <div className="player-position"><span>RW</span></div>
                            <div className="player-nation"><img src="https://selimdoyranli.com/cdn/fut-player-card/img/argentina.svg" alt="Argentina" draggable="false" /></div>
                            <div className="player-club"><img src="https://selimdoyranli.com/cdn/fut-player-card/img/barcelona.svg" alt="Barcelona" draggable="false" /></div>
                        </div>
                        <div className="player-picture">
                            <Image 
                                src={props.picture ? props.picture : "/personsilhouette.png"} 
                                alt={props.picture ? props.name : "Jogador sem foto"} 
                                width={200} 
                                height={200}
                                style={{ objectFit: 'cover' }}
                                draggable="false" 
                            />
                        </div>
                        <div className="rated-icon">
                            {/* {props.initialRating ? (
                                <FaCheck style={{ color: 'green', fontSize: '2.5rem' }}/>
                            ) : (
                                <FaBan style={{ color: 'red', fontSize: '2.5rem' }}/>
                            )} */}
                        </div>
                    </div>
                    <div className="player-card-bottom">
                        <div className="player-info">
                            <div className="player-name"><span>{props.name}</span></div>
                            <div className="player-rating">
                                {props.isCurrentUser ? (
                                    <div className="current-user-message">É assim que sua carta aparece para os outros</div>
                                ) : (
                                    <Rating 
                                        name="overall-rating" 
                                        value={ratings.overall || 0}
                                        precision={0.5} 
                                        onChange={(_event, newValue) => handleAttributeRating('overall', newValue)}
                                        onChangeActive={(_event, newValue) => setHover(newValue)}
                                        emptyIcon={<MdStarOutline style={{ opacity: 1, color: '#d4af37' }} fontSize="inherit" />}
                                        size="large"
                                        disabled={props.isCurrentUser}
                                    />
                                    
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
