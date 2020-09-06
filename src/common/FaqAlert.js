import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

function FaqAlert(props) {
  let key = localStorage.getItem("VISITED")
  if (key && key > 3) {
    return null;
  }
  key = key ? key : 0;
  localStorage.setItem("VISITED", 1 + Number(key))
  return (
    <div class="alert alert-warning alert-dismissible fade show my-2" role="alert">
      <strong>Первый раз на сайте?</strong> Прочти <Link to="/faq">FAQ</Link>!
      <button type="button" class="close" data-dismiss="alert" aria-label="Close" onClick={() => localStorage.setItem("VISITED", 100)}>
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  )
}

FaqAlert.propTypes = {

}

export default FaqAlert

