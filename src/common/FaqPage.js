import React from 'react'
import PropTypes from 'prop-types'
import NavBar from '../navbar/NavBar'
import { useHistory, Link } from 'react-router-dom'


function FaqPage(props) {

  const history = useHistory()

  return (
    <div className="container">
      <NavBar user={props.user} onUserChange={(user) => history.push(`/user/${user}`)} />
      <div className="card mt-2 mb-4">
        <div className="card-body faq">
          <p className="h2">О портале</p>
          <p>TankiRating — портал с игровой статистикой для игры "Танки Онлайн". Данный сайт не имеет ничего общего с официальными ресурсами и является лишь community проектом.</p>
          <p>На портале можно посмотреть игровую статистику для зарегистрированных на сайте игроков. В отличии от официального сайта рейтинга, на портале предоставляются данные в "динамике", то есть возможно посмотреть, к примеру, график наигранного времени, на котором будет чётко и понятно видно, сколько в какой-то  день (неделю, месяц) определённый танкист набил часов, опыта или заработал кристаллов. Кроме наигранного времени отслеживается куча других параметров, но писать о них скучно - <Link to="/user/Fizzika">просто зайди на страницу игрока</Link> и изучай функциональность самостоятельно!</p>
          <p><img src="https://i.imgur.com/PhCZMRy.png" alt="Activity graph" className="d-block w-100"/></p>
          <p className="h2 mt-4">Как сюда попасть</p>
          <p>Проверьте свой ник поиском - может вы уже есть на портале. Если же нет, то <a href="https://ru.tankiforum.com/messenger/compose/?to=139139">напишите</a> со своего игрового аккаунта в ПМ на форуме игроку <strong>sudo</strong>. Тема и содержание письма не важны.</p>
          <p>В течении суток аккаунт будет добавлен на сайт. Если этого не произошло, напишите в ПМ игроку <a href="https://ru.tankiforum.com/messenger/compose/?to=808">Fizzika</a></p>
          <p className="h2 mt-4">Сбор данных</p>
          <p>Сбор данных о активности начинается с момента регистрации на портале. После регистрации вы получите "пустой" профиль, который начнёт обновляться со временем. Со временем профиль будет заполняться данными, которые будут доступны всем посетителям портала.
            Трекинг происходит с помощью открытого API с официального сайта рейтингов. Сервис не требует никаких паролей от вашего игрового аккаунта, пользоваться им абсолютно безопасно.  </p>
          <p className="h2 mt-4">Развитие портала</p>
          <p>Портал вот только-только запустился, поэтому возможны тормоза, глюки, баги и прочие неприятные вещи. Функционал сайта находится в разработке, в будущем планирую добавить пару прикольных вещей, чтобы пользоваться было ещё удобнее и информативней. Если есть идеи-предложения, пишите мне в ПМ :) </p>
          <p>Если умеете программировать/верстать/дизайнить и хотите помочь в разработке - пишите тем более))</p>
          <p className="h2 mt-4">Секта свидетелей онлайна</p>
          <p>На сайте есть <Link to="/online">график онлайна</Link> для самых маленьких посетителей. Попасть можно кликнув по ссылке "OnlineHub" в шапке страницы. Кроме графика CCU есть график PCU. Новые фичи и метрики тоже будут, но потом.   </p>
        </div>
      </div>
    </div>
  )
}

FaqPage.propTypes = {
  user: PropTypes.object
}

export default FaqPage

