<?php

namespace App\Models;
use App\Comment;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Feedback extends Model
{
    use  HasFactory;
    protected $table = 'feedback';

    protected $fillable = ['user_id', 'title', 'description', 'category'];


}
