import React, { memo, useContext } from "react";
import { Button, Typography, Container } from "@material-ui/core";
import FlexBox from "components/FlexBox";
import DoneImg from "../../assets/done.svg";
import useRegisterStyle from "./style";
import RegisterContext from "./RegisterContext";
import { register } from "services/auth";
import { useToasts } from "react-toast-notifications";
import { useRouter } from "hooks/useRouter";

const ConclusionStep = memo(({ back }) => {
  const classes = useRegisterStyle();
  const { push } = useRouter();

  const data = useContext(RegisterContext);

  const { addToast } = useToasts();

  function handleSubmit() {
    register(data)
      .then(res => {
        res = res.data;

        if (!res.isSuccess) {
          addToast("Não foi possível efetuar o cadastro", {
            appearance: "error",
            autoDismiss: true
          });
          return true;
        }

        addToast("Cadastrado efetuado com sucesso!", {
          appearance: "success",
          autoDismiss: true
        });

        setTimeout(() => {
          push('/provider/home');
        }, 3000)
        return false;
      })
      .catch(err => {
        addToast(err, { appearance: "error", autoDismiss: true });
      });
    return false;
  }

  return (
    <FlexBox direction="column" justify="space-between" align="center">
      <Container fixed style={{ padding: 50 }}>
        <Typography variant="subtitle2">
          Obrigado por realizar seu cadastro no nome da empresa {data.name}
        </Typography>

        <img alt="Tudo certo" className={classes.doneImg} src={DoneImg} />

        <Typography variant="h5" color="primary">
          Tudo certo com registro, deseja finalizar?
        </Typography>

        <FlexBox
          className={classes.footerContainer}
          direction="row"
          justify="space-between"
        >
          <Button
            className={classes.backButton}
            variant="outlined"
            onClick={back}
          >
            Voltar
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Finalizar
          </Button>
        </FlexBox>
      </Container>
    </FlexBox>
  );
});

export default ConclusionStep;
