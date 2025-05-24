class Args:
    save_dir = 'path/to/save/models'
    project_name = 'inversecooking'
    model_name = 'model'
    transfer_from = ''
    suff = ''
    image_model = 'resnet50'
    recipe1m_dir = 'path/to/recipe1m'
    aux_data_dir = '../data'
    crop_size = 224
    image_size = 256
    log_step = 10
    learning_rate = 0.001
    scale_learning_rate_cnn = 0.01
    lr_decay_rate = 0.99
    lr_decay_every = 1
    weight_decay = 0.
    embed_size = 512
    n_att = 8
    n_att_ingrs = 4
    transf_layers = 16
    transf_layers_ingrs = 4
    num_epochs = 400
    batch_size = 128
    num_workers = 8
    dropout_encoder = 0.3
    dropout_decoder_r = 0.3
    dropout_decoder_i = 0.3
    finetune_after = -1
    loss_weight = [1.0, 0.0, 0.0, 0.0]
    max_eval = 4096
    label_smoothing_ingr = 0.1
    patience = 50
    maxseqlen = 15
    maxnuminstrs = 10
    maxnumims = 5
    maxnumlabels = 20
    es_metric = 'loss'
    eval_split = 'val'
    numgens = 3
    greedy = True
    temperature = 1.0
    beam = -1
    ingrs_only = False
    recipe_only = False
    log_term = False
    tensorboard = True
    resume = False
    decay_lr = True
    use_lmdb = True
    get_perplexity = False
    use_true_ingrs = False


def get_parser():
    return Args()
