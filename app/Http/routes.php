<?php

Route::get('/', function () {
    return view('home');
});

Route::get('/create/consultation_request', function () {
    return view('create_consultation_requests.blade.php');
});

Route::get('/consultation_requests', function () {
    return view('consultation_requests');
});

Route::get('/consultation_request/{id}', function ($id) {
	return $id;
});
//API

Route::get('/api/consultation_requests', function () {
	return App\Consultation_Request::all();
});

Route::post('/api/consultation_requests', function () {
	App\Consultation_Request::create(Request::all());
});

Route::delete('/api/consultation_requests/{id}', function ($id) {
	App\Consultation_Request::find($id)->delete();
});

Route::get('gmail_test', function () {
	return view('gmail_test');
});

