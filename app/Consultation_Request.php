<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Consultation_Request extends Model
{
	protected $fillable = [
	'email', 'message'
	];

}
