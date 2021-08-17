import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { useAuth } from "../../Providers/Auth";
import Button from "../../components/Button";
import { CardHabit } from "../../components/Card/styles";
import { Link, useHistory } from "react-router-dom";
// import HeaderDash from "../../components/HeaderDash";
// import HeaderDashMobile from "../../components/HeaderDashMobile";
import HeaderDashboard from "../../components/HeaderDashboard";
import { PContainer, CarouselContainer, CardNewHabit } from "./styles";
import Popup from "../../components/Modal";
// import Carousel from "styled-components-carousel";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FooterDash from "../../components/FooterDashboard";
import { CardHabits } from "../../components/CardHabit/style";

const Dashboard = () => {
  const [token] = useState(
    JSON.parse(localStorage.getItem("Habits:token")) || ""
  );
  const { userId } = useAuth();

  //const history = useHistory();
  const [habits, setHabits] = useState([]);
  const [openNewHabit, setOpenNewHabit] = useState(false);
  const [carroussel, setCarroussel] = useState(true);

  const schema = yup.object().shape({
    habit: yup.string().required("Campo obrigatório"),
    category: yup.string().required("Campo obrigatório"),
    difficulty: yup.string().required("Campo obrigatório"),
    frequency: yup.string().required("Campo obrigatório"),
  });

  const { register, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const loadHabits = () => {
    api
      .get("/habits/personal/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setHabits(response.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadHabits();
  });

  const addNewHabit = ({ habit, category, difficulty, frequency }) => {
    console.log(habit, category, difficulty, frequency);
    api
      .post(
        "/habits/",
        {
          title: habit,
          category: category,
          difficulty: difficulty,
          frequency: frequency,
          achieved: false,
          how_much_achieved: 0,
          user: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("response", response);
        loadHabits();
        reset();
      });

    setOpenNewHabit(false);
    setCarroussel(true);
  };

  console.log("habit", habits);

  const handleDelete = ({ id }) => {
    api.delete(`/habits/${id}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  return (
    <>
      <HeaderDashboard />
      <PContainer>
        Em progresso
        <Button
          onClick={() => {
            setOpenNewHabit(true);
            setCarroussel(false);
          }}
        >
          + Novo Hábito
        </Button>
      </PContainer>
      {openNewHabit && (
        <Popup>
          <CardNewHabit>
            <form onSubmit={handleSubmit(addNewHabit)}>
              <section>
                <input
                  placeholder="Novo hábito"
                  {...register("habit")}
                  name="habit"
                  //error={!!errors.habit}
                />
                <input
                  placeholder="Categoria"
                  {...register("category")}
                  name="category"
                  value="Esporte"
                  //error={!!errors.category}
                />
                <input
                  placeholder="Dificuldade"
                  {...register("difficulty")}
                  name="difficulty"
                  value="Fácil"
                  //error={!!errors.difficulty}
                />
                <input
                  placeholder="Frequência"
                  {...register("frequency")}
                  name="frequency"
                  value="Diária"
                  //error={!!errors.frequency}
                />
                <Button type="submit">Adicionar</Button>
              </section>
            </form>
          </CardNewHabit>
        </Popup>
      )}

          {habits.map((habit) => (
              <CardHabit>
                  <div class="habit-container">
                      <h3>Título</h3>
                      <hr />
                      <div class="price-tag">
                          <h2>1</h2> <h2>/</h2> <h1>3</h1> 
                      </div>
                      <div class="messages">
                          <p><i class="fas fa-star"></i> No setup, monthly, or hidden fees</p>
                          <p><i class="fas fa-arrow-down"></i> Pay only for what you use</p>
                          <p><i class="fas fa-clock"></i> Real-time</p>
                      </div>
                      <a href="https://www.w3schools.com" class='cta'>Create Account </a>
                  </div>
              </CardHabit>
            ))}


          {habits.map((habit) => (
              <CardHabit>
                <div key={habit.id}>
                  <p>{habit.title}</p>
                  <p>Período</p>
                  <button onClick={() => handleDelete(habit)}>Remover</button>
                </div>
              </CardHabit>
            ))}
      
      
      {/* {carroussel && (
        <CarouselContainer>
          <Carousel center showArrows showIndicator slidesToShow={3}>
            {habits.map((habit) => (
              <CardHabit>
                <div key={habit.id}>
                  <p>{habit.title}</p>
                  <p>Período</p>
                  <button onClick={() => handleDelete(habit)}>Remover</button>
                </div>
              </CardHabit>
            ))}
          </Carousel>
        </CarouselContainer>
      )} */}

      {/* <button
        onClick={() => {
          localStorage.clear();
          return history.push("/");
        }}
      >
        Sair
      </button>
      <Link to="/groups">Grupos</Link> */}
      {/* <FooterDash /> */}
    </>
  );
};

export default Dashboard;
